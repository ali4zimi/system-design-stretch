'use strict';

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.
//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.

console.log("the game starts");
setTimeout(() => {console.log("the timer fires")}, 0);
Promise.resolve().then(() => {console.log("the promise resolves")});

// the game starts
// the promise resolves
// the timer fires

// My guess were were correct.
//

//
// Step 6: paste the final rethrown message that reached the top.
// Error loading artists: Stretch Records artist page, validating roster
// record 3 of artists.json: Artist is missing a name


// Step 7:
// Run three independent delayed tasks with Promise.all() and log the combined result. Then make one of them reject, observe the whole call fail, switch to Promise.allSettled(), and log every outcome, keeping the survivors.

const task1 = new Promise((resolve) => {
    setTimeout(() => resolve("task 1 done"), 1000);
});

const task2 = new Promise((resolve) => {
    setTimeout(() => resolve("task 2 done"), 2000);
});

const task3 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("task 3 failed")), 1500);
});

Promise.all([task1, task2, task3])
    .then(results => {
        console.log("All tasks completed:", results);
    })
    .catch(error => {
        console.error("One of the tasks failed:", error.message);
    });

Promise.allSettled([task1, task2, task3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Task ${index + 1} succeeded with value:`, result.value);
            } else {
                console.error(`Task ${index + 1} failed with reason:`, result.reason.message);
            }
        });
    });

