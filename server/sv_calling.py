import subprocess 
import os
import sys
import shutil
import psutil
from pathlib import Path
import time
import io

success=True
errorMsg=""
toolOut=""
def on_terminate(proc):
    print("process {} terminated with exit code {}".format(proc, proc.returncode))

def runSVCallerTool (referenceFile, alignedFile, toolName, allArgs):
    global success
    global errorMsg
    global toolOut
    for arg in allArgs:
   
        #popen=subprocess.run("x-terminal-emulator -e \"echo " + toolName + " is running...;echo;" + arg + "\"" + " > log.txt", shell=True, capture_output=True, text=True)
        #cmd="x-terminal-emulator -e 'echo " + toolName + " is running...;echo;" + arg + " 2>&1 | tee log.txt'"
        cmd="x-terminal-emulator -e \"bash -c 'set -o pipefail;echo " + toolName + " is running...;echo;" + arg + " 2>&1 | tee log.txt'\""
        print (cmd)
        popen=subprocess.Popen(cmd, shell=True, executable='/bin/bash', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        proc=psutil.Process(popen.pid)
        returncode=proc.wait()
        print(returncode)
        print(popen.stdout.read())
        f = open("log.txt", "r")
        if returncode != 0 :
            success = False
            errorMsg += f.read()
            f.close()
        else:
            success = True
            toolOut += f.read()
            f.close()

    toolName = toolName.lower()
    return os.getcwd() + "/temp/ToolsOutputs/"  + toolName

def runSelectedTools(reference_file, aligned_file, selectedTools):
    import json
    global success
    global errorMsg
    global toolOut
    print("Inputs >> ", reference_file, aligned_file, selectedTools)
    responseMessages = []
    files = []
    dir_path = os.getcwd() + "/temp/ToolsOutputs/"

    try:
        shutil.rmtree(dir_path, ignore_errors=True)
        os.makedirs("temp/ToolsOutputs")
    except OSError as e:
        print("Error: %s : %s" % (dir_path, e.strerror))
   
    with open(os.getcwd()+"/../config/toolConfigs.json") as json_file:
        data = json.load(json_file)
        
        for tool in data["tools"].values():    
            if tool["name"] in selectedTools:
                print(tool["name"], " selected")
                allArgs = []

                for param in tool["lastUsedParams"].split(","):
                    outputFile = "temp/ToolsOutputs/" + tool["name"].lower() + "/" + tool["outputName"]
                    args = param.strip().replace("${referenceFile}", reference_file).replace("${alignedFile}", aligned_file).replace("${outputName}", outputFile)
                    allArgs.append(args)
                
                try:
                    os.makedirs("temp/ToolsOutputs/"+tool["name"].lower())
                except OSError as e:
                    print("Error: %s : %s" % (dir_path, e.strerror))
                
                outputFileForResponse = runSVCallerTool(reference_file, aligned_file, tool["name"], allArgs)
                if success:
                    responseMessages.append( tool["name"] + " is finished successfully\n")
                    with open(outputFileForResponse+"/consoleLogs.txt", 'w') as f:
                        f.write(toolOut)
                        f.close()
                    toolOut=""
                    files.append(outputFileForResponse)
                else:  
                    responseMessages.append( "*---" + tool["name"] + " has an error: " + errorMsg)
                    errorMsg=""
                

    return (responseMessages, files)
    



