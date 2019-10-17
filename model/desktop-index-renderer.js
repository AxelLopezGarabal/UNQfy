const Vue = require('./vue')

new Vue({
  el: '#app',
  data: {
    commandText: 'artists',
    commandOutput: '',
    errorMessage: '',
    artists: [],
    albums: [],
    tracks: []
  },
  computed: {
  },
  methods: {
    runCurrentCommand() {
      this._runCommand(
        this.commandText,
        result => this.commandOutput = result,
        error  => this.errorMessage  = error.message
      )
      this.errorMessage = ''
      this._runCommand('artists', result => this.artists =
        Array.isArray(result.returned)
          ? result.returned
          : [result.returned])
      
      this._runCommand('albums',  result => this.albums  = result.returned)
      this._runCommand('tracks',  result => this.tracks  = result.returned)
    },
    
    _runCommand(commandText, successCallback, errorCallback = anError => console.error(anError)) {
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);

      const run = async (commandText) => {
        const { stdout, stderr } = await exec(`node src/main ${commandText}`)
        if (stderr) throw Error(stderr)
        return JSON.parse(stdout, null, '  ')
      }
      
      run(commandText).then(successCallback).catch(errorCallback)

      //this.commandText = ''
    }
  }
})