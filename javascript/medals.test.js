function createMedalTable(medals) {
    // First lets define the dictionary for our results
    let pointsTally = {}

    // Access Medals won for each event
    medals.forEach( eachEvent => {

        // Isolate event's podium scores
        let podiumResults = eachEvent.podium // ["1.China", "2.Germany", "3.ROC"]

        // Access each place on the podium and allocate the correct points
        for (let finishedPositions in podiumResults) { // finishedPositions = ["1.China"]

            let placement = finishedPositions.charAt(0) // "1"
            let country = finishedPositions.substring(2) // "China"

            // Ternary Operator used to identify countries that are already inside the points tally, their score
            // will be added if they are and if not then the score for that event will be recorded
            switch (placement) {
                case "1" :
                    pointsTally.hasOwnProperty(country) ? pointsTally[country] += 3 : pointsTally[country] = 3
                case "2" :
                    pointsTally.hasOwnProperty(country) ? pointsTally[country] += 2 : pointsTally[country] = 2
                case "3" :
                    pointsTally.hasOwnProperty(country) ? pointsTally[country] += 1 : pointsTally[country] = 1
            }  
        }
    }); 
    
    return pointsTally
}

describe("Medal Table Generator", () => {

    it("creates correct data structure ", () => {
       
        
        const medals = [
            {
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