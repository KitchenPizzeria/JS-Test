function createMedalTable(medals) {
    // First Lets define the dictionary for our results
    var pointsTally = {}

    // Access Medals won for each event
    medals.forEach( stat => {

        // Isolate event's podium scores
        var podiumResults = stat["podium"]

        // Create a mapping so that each countries place can be converted to a score
        var scores = podiumResults.map( function(data) { 

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

        // Iterate through each score and populate the points tally with the country and their acquired score
        scores.forEach( country => {

            var points = country[0]
            var name = country[1]

            // Ternary Operator: If country is in the tally, then the score will be added to their current score
            // else the country will be added to the list with the score achieved from that event
            pointsTally.hasOwnProperty(name) ? pointsTally[name] += points : pointsTally[name] = points
        });   
    }); 
    
    return pointsTally
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