import subprocess 
import os
import shlex
import sys
import shutil
from pathlib import Path

out=""
def runSVCallerTool (referenceFile, alignedFile, toolName, allArgs):
    import os
    
    print(toolName)
    for arg in allArgs:
        popen=subprocess.Popen("x-terminal-emulator -e \"echo " + toolName + " is running...;echo;" + arg + "\"", shell=True, stdout=subprocess.PIPE)
        popen=subprocess.Popen(arg, stdout=subprocess.PIPE)
        popen.wait()

    toolName = toolName.lower()
    return os.getcwd() + "/temp/ToolsOutputs/"  + toolName

def runSelectedTools(reference_file, aligned_file, selectedTools):
    import json

    print("Inputs >> ", reference_file, aligned_file, selectedTools)
    responseMessages = []
    files = []
    dir_path = os.getcwd() + "/temp/ToolsOutputs/"
    print("checkpoint1")
    try:
        shutil.rmtree(dir_path, ignore_errors=True)
        print("checkpoint1.1")
        os.makedirs("temp/ToolsOutputs")
    except OSError as e:
        print("Error: %s : %s" % (dir_path, e.strerror))
   
    with open(os.getcwd()+"/../config/toolConfigs.json") as json_file:
        data = json.load(json_file)
        for tool in data["tools"].values():
            print(tool["name"])
            if tool["name"] in selectedTools:
                print(tool["name"], " selected")
                allArgs = []
                
                for param in tool["lastUsedParams"].split(","):
                    outputFile = "temp/ToolsOutputs/" + tool["name"].lower() + "/" + tool["outputName"]
                    args = param.strip().replace("${referenceFile}", reference_file).replace("${alignedFile}", aligned_file).replace("${outputName}", outputFile)
                    allArgs.append(args)
                
                print(allArgs)
                print("checkpoint2")
                try:
                    print("checkpoint2.1")
                    os.makedirs("temp/ToolsOutputs/"+tool["name"].lower())
                except OSError as e:
                    print("Error: %s : %s" % (dir_path, e.strerror))
                outputFileForResponse = runSVCallerTool(reference_file, aligned_file, tool["name"], allArgs)
                responseMessages.append( tool["name"] + " is finished successfully\n")
                files.append(outputFileForResponse)

    return (responseMessages, files)
    



