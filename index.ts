import ParcelWatcher from "@parcel/watcher";
import fs from "fs";

async function sample() {
  let f = `${process.cwd()}/demo`;
  for (let i = 0; i < 1000; i++) {
    fs.writeFileSync(`${f.toString()}/test_${i}.txt`,"")
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
  fs.readdir( f, (error, files) => { 
    let totalFiles = files.length;
    console.log(totalFiles); // 1000 + 1
 });
  let counter = 0;
  let subscription = await ParcelWatcher.subscribe(
    f,
    (err, events) => {
      for (let event of events) {
        // console.log(event);
        counter++;
      }
    }
  );

  for (let i = 0; i < 1000; i++) {
    fs.unlinkSync(`${f.toString()}/test_${i}.txt`)
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
  fs.readdir( f, (error, files) => { 
    let totalFiles = files.length;
    console.log(totalFiles); // 1
 });
  console.log("counter", counter);

  subscription.unsubscribe();
}

sample();
