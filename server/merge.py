import subprocess

def runSurvivor(file_name):
    argsSurvivor = ("SURVIVOR", "merge", file_name, "1000", "2", "1", "1", "0", "30", "sample_merged.vcf")
    popen=subprocess.Popen(argsSurvivor)
    popen.wait()
