import ParcelWatcher from "@parcel/watcher";
import { spawnSync } from "child_process";

async function sample() {
  let f = "/Users/dietrich/tmp/rpx/demo";
  for (let i = 0; i < 1000; i++) {
    spawnSync("touch", [`${f.toString()}/test_${i}.txt`]);
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
  let counter = 0;
  let subscription = await ParcelWatcher.subscribe(
    "/Users/dietrich/tmp/rpx/demo",
    (err, events) => {
      for (let event of events) {
        // console.log(event);
        counter++;
      }
    }
  );

  spawnSync("sh", [`${f.toString()}/../x.sh`]);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("counter", counter);

  subscription.unsubscribe();
}

sample();
