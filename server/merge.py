import subprocess
import os
import shutil

def runSurvivor(file_name):
    fileList = file_name.split(".vcf")
    responseMessages = []
    files = []
    dir_path = os.getcwd() + "/temp/merge/"
    try:
        shutil.rmtree(dir_path, ignore_errors=True)
        os.makedirs("temp/merge")
    except OSError as e:
        print("Error: %s : %s" % (dir_path, e.strerror))

    f = open(os.getcwd()+"/temp/merge/mergefile", "w")
    for i in range (0,len(fileList)-1):
        f.write(fileList[i] + ".vcf" + "\n")
    f.close()

    with open("temp/merge/mergefile", "r") as f:
        data = f.read()
        with open("temp/merge/mergefile", "w") as w:
            w.write(data[:-1])

    import json

    with open(os.getcwd()+"/../config/toolConfigs.json") as json_file:
        data = json.load(json_file)
        outputFile = "temp/merge/" + data["tools"]["Survivor"]["outputName"] + ".vcf"
        args = data["tools"]["Survivor"]["lastUsedParams"].strip().replace("${outputName}", outputFile).split(" ")

    popen=subprocess.Popen(args)
    popen.wait()
    os.remove("temp/merge/mergefile")
    files.append(os.getcwd() + "/temp/merge")
    responseMessages.append("Merging is finished successfully\n")

    return (responseMessages, files)