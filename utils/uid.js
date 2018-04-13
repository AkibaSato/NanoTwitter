module.exports.generateUid = () => {
  console.log("generating uid")
  const t = (new Date).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10

}
