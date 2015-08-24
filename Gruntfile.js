module.exports = function (grunt) {

	grunt.initConfig({
		browserify: {
			build: {
				src: 'build.js',
				dest: 'build/node.js'
			}
		}
	})

	grunt.loadNpmTasks('grunt-browserify')

	grunt.registerTask('default', ['browserify'])
}