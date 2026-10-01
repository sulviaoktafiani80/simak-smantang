import admin from "firebase-admin";
import fs from "fs";
import crypto from "crypto";

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) { console.error(`Service account tidak ditemukan: ${SERVICE_ACCOUNT_PATH}`); process.exit(1); }
const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH,"utf8"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const auth=admin.auth(), db=admin.firestore();
fs.mkdirSync("./output",{recursive:true});
const randomPassword=()=>`Sm!${crypto.randomBytes(12).toString("base64url")}9`;
const esc=v=>`"${String(v??"").replaceAll('"','""')}"`;
const snap=await db.collection("accountAdminRequests").where("status","==","Pending").where("type","==","RESET_PASSWORD").get();
if(snap.empty){console.log("Tidak ada permintaan RESET_PASSWORD berstatus Pending.");process.exit(0);}
const results=[];let ok=0,failed=0;
for(const doc of snap.docs){const req=doc.data();try{const ur=await auth.getUser(req.targetUid);const password=randomPassword();await auth.updateUser(ur.uid,{password,disabled:false});await doc.ref.update({status:"Completed",completedAt:admin.firestore.FieldValue.serverTimestamp(),processedBy:"Firebase Admin SDK v56",error:null});results.push({requestId:doc.id,uid:ur.uid,name:req.targetName||ur.displayName||"",email:ur.email||req.targetEmail||"",role:req.targetRole||"",localId:req.targetLocalId||"",temporaryPassword:password,status:"Completed",error:""});ok++;console.log(`COMPLETED  ${req.targetName||ur.email}`);}catch(e){failed++;await doc.ref.update({status:"Failed",completedAt:admin.firestore.FieldValue.serverTimestamp(),processedBy:"Firebase Admin SDK v56",error:`${e.code||""} ${e.message||e}`.slice(0,500)}).catch(()=>{});results.push({requestId:doc.id,uid:req.targetUid||"",name:req.targetName||"",email:req.targetEmail||"",role:req.targetRole||"",localId:req.targetLocalId||"",temporaryPassword:"",status:"Failed",error:`${e.code||""} ${e.message||e}`});console.error(`FAILED ${req.targetName||req.targetUid}:`,e.code||"",e.message||e);}}
const fields=["requestId","uid","name","email","role","localId","temporaryPassword","status","error"];
const csv=[fields.map(esc).join(","),...results.map(r=>fields.map(f=>esc(r[f])).join(","))].join("\n");
const filename=`./output/password-reset-results-${new Date().toISOString().replace(/[:.]/g,"-")}.csv`;
fs.writeFileSync(filename,"\uFEFF"+csv,"utf8");
console.log("\n=== RINGKASAN RESET PASSWORD ===");console.log("Pending diproses :",snap.size);console.log("Berhasil         :",ok);console.log("Gagal            :",failed);console.log("Kredensial lokal :",filename);console.log("\nJangan upload file hasil reset ke GitHub.");
