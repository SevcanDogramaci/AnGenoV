import subprocess 

def runDelly():
    argsDelly = ("delly", "call", "-o", "outputDelly.bcf", "-g", "/home/mert/bioinfo/bi-project/hs37d5.fa", "/home/mert/bioinfo/bi-project/HG00114.chrom20.ILLUMINA.bwa.GBR.low_coverage.20120522.bam")
    popen=subprocess.Popen(argsDelly)
    popen.wait()