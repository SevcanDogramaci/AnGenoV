import subprocess
import os
import shutil

def runSurvivor(fileList):
    success=True
    errorMsg=""
    toolOut=""
    fileList = fileList[0].split(",")
    responseMessages = []
    files = []
    dir_path = os.getcwd() + "/temp/merge/"
    try:
        shutil.rmtree(dir_path, ignore_errors=True)
        os.makedirs("temp/merge")
    except OSError as e:
        print("Error: %s : %s" % (dir_path, e.strerror))

    f = open(os.getcwd()+"/temp/merge/mergefile", "w")
    for i in range (0,len(fileList)):
        print(fileList)
        # f.write(fileList[i] + ".vcf" + "\n")
        f.write(fileList[i] + "\n")
    f.close()

    with open("temp/merge/mergefile", "r") as f:
        data = f.read()
        with open("temp/merge/mergefile", "w") as w:
            w.write(data[:-1])

    import json

    with open(os.getcwd()+"/../config/toolConfigs.json") as json_file:
        data = json.load(json_file)
        outputFile = "temp/merge/" + data["tools"]["SURVIVOR"]["outputName"] + ".vcf"
        args = data["tools"]["SURVIVOR"]["lastUsedParams"].strip().replace("${outputName}", outputFile)
    
    args = "bash -c 'set -o pipefail;" + args + " 2>&1 | tee log.txt'"
    popen=subprocess.run(args, shell=True, executable='/bin/bash')
    returncode=popen.returncode
    f = open("log.txt", "r")
    if returncode != 0 :
        success = False
        errorMsg += f.read()
        f.close()
    else:
        success = True
        toolOut += f.read()
        f.close()
    os.remove("temp/merge/mergefile")
    if success:
        responseMessages.append("Merging is finished successfully\n")
        with open(os.getcwd() + "/temp/merge/consoleLogs.txt", 'w') as f:
            f.write(toolOut)
            f.close()
        toolOut=""
        files.append(os.getcwd() + "/temp/merge")
    else:  
        responseMessages.append( "*---" + "An error occured:\n " + errorMsg)
        errorMsg=""

    return (responseMessages, files)