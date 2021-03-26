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
        with open("mergefile", "w") as w:
            w.write(data[:-1])


    argsSurvivor = ("SURVIVOR", "merge", "mergefile", "1000", "2", "1", "1", "0", "30", "temp/merge/merged.vcf")
    popen=subprocess.Popen(argsSurvivor)
    popen.wait()

    files.append(os.getcwd() + "/temp/merge")
    responseMessages.append("Merging is finished successfully\n")

    return (responseMessages, files)