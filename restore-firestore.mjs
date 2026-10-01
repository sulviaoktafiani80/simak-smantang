import admin from "firebase-admin";
import fs from "fs";

const args=new Set(process.argv.slice(2));
if(!args.has("--confirm=RESTORE")){
  console.error("RESTORE DIBATALKAN.");
  console.error("Gunakan hanya setelah backup baru dibuat:");
  console.error("node restore-firestore.mjs ./output/<folder>/firestore.json --confirm=RESTORE");
  process.exit(1);
}
const input=process.argv.slice(2).find(x=>x.endsWith(".json"));
if(!input||!fs.existsSync(input)){
  console.error("File firestore.json tidak ditemukan.");
  process.exit(1);
}
const servicePath=process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
if(!fs.existsSync(servicePath)){
  console.error(`Service account tidak ditemukan: ${servicePath}`);
  process.exit(1);
}
const serviceAccount=JSON.parse(fs.readFileSync(servicePath,"utf8"));
admin.initializeApp({credential:admin.credential.cert(serviceAccount)});
const db=admin.firestore();
const payload=JSON.parse(fs.readFileSync(input,"utf8"));

const revive=(v)=>{
  if(Array.isArray(v)) return v.map(revive);
  if(v&&typeof v==="object"){
    if(v.__type==="timestamp"&&v.value) return admin.firestore.Timestamp.fromDate(new Date(v.value));
    if(v.__type==="date"&&v.value) return new Date(v.value);
    const out={};
    for(const [k,val] of Object.entries(v)) out[k]=revive(val);
    return out;
  }
  return v;
};

let total=0;
for(const [collection,docs] of Object.entries(payload.collections||{})){
  for(let i=0;i<docs.length;i+=400){
    const batch=db.batch();
    const chunk=docs.slice(i,i+400);
    for(const doc of chunk){
      const {id,...data}=doc;
      if(!id) continue;
      batch.set(db.collection(collection).doc(id),revive(data),{merge:true});
      total++;
    }
    await batch.commit();
  }
  console.log(`${collection}: ${docs.length}`);
}
console.log(`\nRestore merge selesai: ${total} dokumen.`);
console.log("Toolkit ini tidak menghapus dokumen yang tidak ada dalam backup.");
console.log("Firebase Authentication users/password tidak diubah.");
