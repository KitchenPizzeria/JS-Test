function createMedalTable(medals) {
    // First Lets define the dictionary for our results
    let pointsDict = {}

    // Access Medals won for each event
    medals.forEach( stat => {

        // Isolate event's podium scores
        let podiumResults = stat["podium"]

        // format the scores to remove ordinal placement
        var countriesScores = podiumResults.map( function(data) { 

            var placement = data.charAt(0)
            var country = data.substring(2)
            
            // We need to map each placement with a score
            // then return it back to the array

            switch (placement) {
                case "1" :
                    return [3, country]
                case "2" :
                    return [2, country]
                case "3" :
                    return [1, country]
            }  
        })

        // Iterate through each countries and score
        countriesScores.forEach( country => {

            var score = country[0]
            var name = country[1]

            // Check that country has not already been added to count
            if (pointsDict.hasOwnProperty(name)){

                // increase score if country has already been added
                pointsDict[name] += score

            // Add new country and their score if not already added
            } else {
                pointsDict[name] = score
            }
        });   
    });

    return pointsDict
}

describe("Medal Table Generator", () => {

    it("creates correct data structure ", () => {
       
        const medals = [{
                sport: "cycling",
                podium: ["1.China", "2.Germany", "3.ROC"]
            },
            {
                sport: "fencing",
                podium: ["1.ROC", "2.France", "3.Italy"]
            },
            {
                sport: "high jump",
                podium: ["1.Italy", "1.Qatar", "3.Belarus"]
            },
            {
                sport: "swimming",
                podium: ["1.USA", "2.France", "3.Brazil"]
            }
        ];

        // Expected output data
        const medalTable = {
            "Italy": 4,
            "France": 4,
            "ROC": 4,
            "USA": 3,
            "Qatar": 3,
            "China": 3,
            "Germany": 2,
            "Brazil": 1,
            "Belarus": 1,
        };

        const actualResult = createMedalTable(medals);

        expect(actualResult).toMatchObject(medalTable);
    });
});