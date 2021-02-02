import subprocess 

def runDelly(referenceFile, alignedFile):
    argsDelly = ("delly", "call", "-o", "outputDelly.bcf", "-g", referenceFile, alignedFile)
    popen=subprocess.Popen(argsDelly)
    popen.wait()