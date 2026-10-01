import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const servicePath=process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
if(!fs.existsSync(servicePath)){
  console.error(`Service account tidak ditemukan: ${servicePath}`);
  process.exit(1);
}
const serviceAccount=JSON.parse(fs.readFileSync(servicePath,"utf8"));
admin.initializeApp({credential:admin.credential.cert(serviceAccount)});
const db=admin.firestore();
const auth=admin.auth();

const collections=[
  "users","students","staffMaster","academicPeriods","schedules","announcements",
  "attendanceRecords","staffAttendanceRecords","assessmentRecords","interventionRecords",
  "mentoringRecords","leaveRequests","teachingMonitorRecords","dutyJournalRecords",
  "supervision","learningDocuments","raporIndicators","deviceAssessments",
  "curriculumArchives","activityPrograms","activityParticipants","activityLogs",
  "tkaQuestions","tkaPackages","tkaAttempts","accountAdminRequests","qrAssignments",
  "qrTokens","auditLogs","systemEvents","systemConfig"
];

const serialize=(value)=>{
  if(value===null||value===undefined) return value??null;
  if(value instanceof admin.firestore.Timestamp) return {__type:"timestamp",value:value.toDate().toISOString()};
  if(Buffer.isBuffer(value)) return {__type:"buffer",value:value.toString("base64")};
  if(Array.isArray(value)) return value.map(serialize);
  if(typeof value==="object"){
    const out={};
    for(const [k,v] of Object.entries(value)) out[k]=serialize(v);
    return out;
  }
  return value;
};

const stamp=new Date().toISOString().replace(/[:.]/g,"-");
const outDir=path.resolve("./output",`simak-v60-${stamp}`);
fs.mkdirSync(outDir,{recursive:true});

const firestoreExport={projectId:serviceAccount.project_id,exportedAt:new Date().toISOString(),collections:{},errors:{}};
for(const name of collections){
  try{
    const snap=await db.collection(name).get();
    firestoreExport.collections[name]=snap.docs.map(d=>({id:d.id,...serialize(d.data())}));
    console.log(`${name}: ${snap.size}`);
  }catch(e){
    firestoreExport.errors[name]=`${e.code||""} ${e.message||e}`.trim();
    console.error(`${name}: FAILED`,e.message||e);
  }
}
fs.writeFileSync(path.join(outDir,"firestore.json"),JSON.stringify(firestoreExport,null,2));

let pageToken;
const users=[];
do{
  const page=await auth.listUsers(1000,pageToken);
  users.push(...page.users.map(u=>({
    uid:u.uid,email:u.email||"",displayName:u.displayName||"",disabled:u.disabled,
    emailVerified:u.emailVerified,phoneNumber:u.phoneNumber||"",
    providerData:u.providerData,
    customClaims:u.customClaims||{},
    metadata:{
      creationTime:u.metadata.creationTime,
      lastSignInTime:u.metadata.lastSignInTime
    }
  })));
  pageToken=page.pageToken;
}while(pageToken);

fs.writeFileSync(path.join(outDir,"auth-users.json"),JSON.stringify({
  projectId:serviceAccount.project_id,
  exportedAt:new Date().toISOString(),
  note:"Password hashes/password plaintext are not exported by this toolkit.",
  users
},null,2));

fs.writeFileSync(path.join(outDir,"manifest.json"),JSON.stringify({
  app:"SIMAK SMANTANG",
  version:"v60",
  projectId:serviceAccount.project_id,
  exportedAt:new Date().toISOString(),
  firestoreCollections:Object.keys(firestoreExport.collections),
  firestoreDocumentCount:Object.values(firestoreExport.collections).reduce((s,a)=>s+a.length,0),
  authUserCount:users.length,
  errors:firestoreExport.errors,
  restoreWarning:"Always create a fresh backup before any restore."
},null,2));

console.log(`\nBackup selesai: ${outDir}`);
console.log(`Auth users: ${users.length}`);
console.log("Password pengguna tidak disertakan.");
