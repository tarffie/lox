console.log({ for_loop: "1st" });

for (let i = 0; i < 5; ++i) {
  console.log(i);
}

console.log({ for_loop: "2nd" });

for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log({ for_loop: "3rd" });

for (let i = 0; i < 5; i += 1) {
  console.log(i);
}
