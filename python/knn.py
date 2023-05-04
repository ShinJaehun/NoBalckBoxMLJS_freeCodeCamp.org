classes={
    "car":0,
    "fish":1,
    "house":2,
    "tree":3,
    "bicycle":4,
    "guitar":5,
    "pencil":6,
    "clock":7
}

def readFeatureFile(filePath):
    f=open("../data/dataset/training.csv", 'r')
    lines=f.readlines()
    # print(len(lines))

    X=[]
    y=[]
    for i in range(1,len(lines)):
        row=lines[i].split(",")
        X.append(
            # [float(row[j])] for j in range(len(row)-1) # <-- 자동완성만 믿다보니 이런 실수를 해도...
            [float(row[j]) for j in range(len(row)-1)]
        )
        y.append(classes[row[-1].strip()])

    # print(y[:10])
    return (X,y)

from sklearn.neighbors import KNeighborsClassifier

knn=KNeighborsClassifier(
    n_neighbors=50,
    algorithm="brute",
    weights="uniform"
)

X,y=readFeatureFile("../data/dataset/training.csv")

knn.fit(X,y)

X,y=readFeatureFile("../data/dataset/testing.csv")

accuracy=knn.score(X,y)

print("Accuracy:", accuracy)