import subprocess 

def runDelly(referenceFile, alignedFile):
    logfile = open("/home/mert/Desktop/AnGenoV/web_interface/src/pages/VariantCalling/Calling/logfile.txt" , "w")
    argsDelly = ("delly", "call", "-o", "outputDelly.bcf", "-g", referenceFile, alignedFile)
    popen=subprocess.Popen(argsDelly, stdout=logfile)
    popen.wait()

def runTardis(referenceFile, alignedFile):
    logfile = open("/home/mert/Desktop/AnGenoV/web_interface/src/pages/VariantCalling/Calling/logfile.txt" , "w")
    argsTardis = ("tardis", "--no-interdup", "--no-mei" , "-i" , alignedFile, "--ref", referenceFile, "--sonic", "human_g1k_v37.sonic", "--out", "outputTardis")
    popen=subprocess.Popen(argsTardis, stdout=logfile)
    popen.wait()

def runManta(referenceFile, alignedFile):
    logfile = open("/home/mert/Desktop/AnGenoV/web_interface/src/pages/VariantCalling/Calling/logfile.txt" , "w")
    argsConfManta = ("configManta.py" , "--bam", alignedFile, "--referenceFasta", referenceFile, "--runDir", "outputManta")
    argsRunManta = ("outputManta/runWorkflow.py")
    popen=subprocess.Popen(argsConfManta, stdout=logfile)
    popen.wait()
    popen=subprocess.Popen(argsRunManta, stdout=logfile)
