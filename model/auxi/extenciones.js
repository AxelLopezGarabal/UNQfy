module.exports = {
  extendArray() {
    Array.prototype.flatMap = function(f) {
      return this.map(f).reduce((z, xs) => z.concat(xs), [])
    }

    Array.prototype.remove = function(x) {
      return this.splice(this.indexOf(x), 1)
    }
  }
}

