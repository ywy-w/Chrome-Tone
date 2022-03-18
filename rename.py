import os

fileType = '.wav'
fileSequence = 1
folderPath = r'samples'

for filename in os.listdir(folderPath):
	os.rename(f'{folderPath}/{filename}', f'{folderPath}/{str(fileSequence)}.{fileType}')
	fileSequence +=1
