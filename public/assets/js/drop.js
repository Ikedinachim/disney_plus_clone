
Dropzone.options.letsDoThis = {
    //autoProcessQueue: false,
    AddRemoveLink: true,
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    acceptedFiles: ".png, .jpg, .jpeg, .pdf, .xsls",
    accept: function (file, done) {
        if (file.size <= 0.5) {
            done("Accepted");
        }
        else { done(); }
    }
     
};

Dropzone.options.letsDoThis.autoProcessQueue = false;