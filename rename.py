import os

folderPath = r'samples'

fileSequence = 1

for filename in os.listdir(folderPath):
	os.rename(f'{folderPath}/{filename}', f'{folderPath}/{str(fileSequence)}.wav')
	fileSequence +=1
