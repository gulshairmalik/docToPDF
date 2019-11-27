import sys
import subprocess

filename = sys.argv[1]
subprocess.check_output(['libreoffice', '--convert-to', 'pdf' ,filename,'--outdir', './public/uploads/'])
print('DONE')
