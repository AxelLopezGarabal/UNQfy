module.exports = {
  extendArray() {
    Array.prototype.flatMap = function(f) {
      return this.map(f).reduce((z, xs) => z.concat(xs), [])
    }
  }
}

