// Modules
var gulp = require("gulp");
var kit = require("gulp-kit");
var exec = require("child_process").exec;
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var notify = require("gulp-notify");

// PDF-Command
var execPdf = "prince -s out/print.css out/print.html out/print.pdf";

// Default-Task
gulp.task("default", ["watch"]);

// Watch-Task
gulp.task("watch", function() {
    gulp.watch("src/kit/**/*.kit", ["pdf-kit"]);
    gulp.watch("src/less/**/*.less", ["pdf-less"]);
});

// LESS-Task
gulp.task("less", function() {
    return gulp.src("src/less/print.less")
        .pipe(less())
        .on("error", function(error) {
            notify.onError({
                title: "Gulp (LESS)",
                message: "<%= error.message %>",
                sound: "Basso",
                icon: "Terminal Icon"
            })(error);
            this.emit("end");
        })
        .pipe(gulp.dest("out/"))
        .pipe(cssmin())
        .pipe(gulp.dest("out/"))
        .pipe(notify({
            sound: false,
            icon: "Terminal Icon",
            title: "Gulp (LESS)",
            message: "out/<%= file.relative %> kompiliert\nout/print.pdf erzeugt",
        }));
});

// KIT-Task
gulp.task("kit", function() {
    return gulp.src("src/kit/print.kit")
        .pipe(kit())
        .on("error", function(error) {
            notify.onError({
                title: "Gulp (KIT)",
                message: "<%= error.message %>",
                sound: "Basso",
                icon: "Terminal Icon"
            })(error);
            this.emit("end");
        })
        .pipe(gulp.dest("out/"))
        .pipe(notify({
            sound: false,
            icon: "Terminal Icon",
            title: "Gulp (KIT)",
            message: "out/<%= file.relative %> kompiliert\nout/print.pdf erzeugt",
        }));
});

// PDF-Tasks
gulp.task("pdf-kit", ["kit"], function() { exec(execPdf); });
gulp.task("pdf-less", ["less"], function() { exec(execPdf); });
