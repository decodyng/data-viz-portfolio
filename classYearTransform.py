from __future__ import division
import pandas as pd 
from random import uniform 
import json 

def generateFakeContinents(): 
	firstCont = round(uniform(0, 0.75), 3)
	remainder = 1 - firstCont
	secondCont = round(uniform(0, remainder), 3)
	thirdCont = round(1 - (firstCont + secondCont), 3)
	return {'MENA': firstCont, 'Asia': secondCont, 'Latin America': thirdCont}

if __name__ == "__main__":
	df = pd.read_csv("classificationPercentByYear.csv")
	outArray = []
	for ind, row in df.iterrows(): 
		rowDict = {}
		print ind, row
		if int(row['year']) < 2000: 
			continue 
		rowDict['year'] = int(row['year'])
		ncables = int(row['totalcables'])
		rowDict['nCables'] = ncables
		rowDict['stackedData'] = {}
		rowDict['stackedData']['secret'] = round(row['percsecret'], 3)*ncables
		rowDict['stackedData']['confidential'] = round(row['percconfidential'], 3)*ncables
		rowDict['stackedData']['unclassified'] = round(row['percunclassified'], 3)*ncables
		rowDict['stackedData']['unknown'] = round(row['percentunknown'], 3)*ncables
		rowDict['continentData'] = []
		rowDict['continentData'].append({'classification': 'secret', 'continents': generateFakeContinents()})
		rowDict['continentData'].append({'classification': 'confidential', 'continents':generateFakeContinents()})
		rowDict['continentData'].append({'classification': 'unclassified', 'continents': generateFakeContinents()})
		
		outArray.append(rowDict)

	with open('classifiedCountsByYear.json', 'wb') as fp:
		json.dump(outArray, fp) 

