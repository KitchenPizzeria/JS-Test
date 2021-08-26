function createMedalTable(medals) {

    // First lets define the 'enum' for our results
    const points = {
        '1': 3,
        '2': 2,
        '3': 1
    }

    // Dictionary to hold the results
    let pointsTally = {}

    // Access Medals won for each event
    medals.forEach( eachEvent => {
        
        // Isolate event's podium scores
        let podiumResults = eachEvent.podium // ["1.China", "2.Germany", "3.ROC"]
        
        // Access each place on the podium and allocate the correct points
        for (let finishedPositions of podiumResults) { // finishedPositions = ["1.China"]
        
            let placement = finishedPositions.charAt(0) // "1" or "2" or "3"
            let country = finishedPositions.substring(2) // "China" or "Germany" or "ROC"
            let score = points[placement] // 1 --> 3 , 2 --> 2 , 3 --> 1
      
            // Countries not in the list will have the event score recorded, else score will just be added
            pointsTally.hasOwnProperty(country) ? pointsTally[country] += score : pointsTally[country] = score    
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