export default (function* generateId() {
  let i = 1;
  while(true) {
       yield i++;
    }
})();
