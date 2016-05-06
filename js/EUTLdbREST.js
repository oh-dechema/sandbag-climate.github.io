console.log("REST!");

function getCountries(serverURL, onLoadEnd) {

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY) RETURN c.name";

	query.statements.push({"statement": statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getSectors(serverURL, onLoadEnd){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (s:SECTOR) RETURN s.name ORDER BY s.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getSandbagSectors(serverURL, onLoadEnd){
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (s:SANDBAG_SECTOR) RETURN s.name ORDER BY s.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getPeriods(serverURL, onLoadEnd){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (p:PERIOD) RETURN p.name ORDER BY p.name ASC";

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));

}

function getVerifiedEmissionsForPeriod(serverURL, periodName, onLoadEnd){
    
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD) " +
                       "WHERE p.name = '" + periodName + "' " +
					   "RETURN sum(ve.value) AS Verified_Emissions, c.name, ss.name ORDER BY c.name, ss.name";
    
    console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getFreeAllocationForPeriod(serverURL, periodName, onLoadEnd){
        
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(i)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                       "WHERE p.name = '" + periodName + "' " +
					   "RETURN sum(aa.value) AS Free_Allocation, c.name, ss.name ORDER BY c.name, ss.name";
    
    console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getOffsetsForPeriod(serverURL, periodName, onLoadEnd){
        
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE p.name = '" + periodName + "' " +
					   "RETURN sum(o.amount) AS Offsets, c.name, ss.name ORDER BY c.name, ss.name";
    
    console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getSurrenderedUnitsForPeriod(serverURL, periodName, onLoadEnd){
        
    var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[su:SURRENDERED_UNITS]->(p:PERIOD) " +
                       "WHERE p.name = '" + periodName + "' " +
					   "RETURN sum(su.value) AS Surrendered_Units, c.name, s.name ORDER BY c.name, s.name";
    
    console.log("statement!", statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getVerifiedEmissionsForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, onLoadEnd ){
    var query = {
	    "statements" : [ ]
	};
    
    var statementSt;
    
    if(isSandbagSector){
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " " +
					   "RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
    }else{
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD)" +
                       "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(ve.value) AS Verified_Emissions, p.name ORDER BY p.name";
    }

	

	//console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}


function getOffsetsForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, onLoadEnd ){
    var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(isSandbagSector){
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)" +
					   ", (i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
    }else{
        statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)" +
					   ", (i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                       "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " AND (o.unit_type = 'ERU' " +
					   "OR o.unit_type = 'CER') RETURN sum(o.amount) AS Offsets, p.name ORDER BY p.name";
    }
    

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}


function getFreeAllocationForCountryAndSector(serverURL, countryNames, sectorNames, isSandbagSector, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt;
    
    if(isSandbagSector){
        statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)<-[:AGGREGATES_SECTOR]-(ss:SANDBAG_SECTOR)," +
                        "(i)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND ss.name IN " + sectorNames + " " +
					   "RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name";
    }else{
        statementSt= "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[fa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(fa.value) AS Free_Allocation, p.name ORDER BY p.name";
    }
    
    

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getSurplusFreeAllowancesForCountryAndSector(serverURL, countryNames, sectorNames, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (i)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(aa.value) - sum(ve.value) AS Surplus_Free_Allowances, p.name ORDER BY p.name";

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getTotalSuplyForCountryAndSector(serverURL, countryNames, sectorNames, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR),"+
                        "(i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD), (i)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD) " +  
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(aa.value) + sum(o.amount) AS Total_Suply, p.name ORDER BY p.name";

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getSurplusWithOffsetsForCountryAndSector(serverURL, countryNames, sectorNames, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (i)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD), " +
                        "(i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(aa.value) + sum(o.amount) - sum(ve.value) AS Surplus_With_Offsets, p.name ORDER BY p.name";

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

function getSurplusForAllPeriods(serverURL, countryNames, sectorNames, onLoadEnd ){

	var query = {
	    "statements" : [ ]
	};

	var statementSt = "MATCH (c:COUNTRY)<-[:INSTALLATION_COUNTRY]-(i:INSTALLATION)-[:INSTALLATION_SECTOR]->(s:SECTOR)," +
                        "(i)-[ve:VERIFIED_EMISSIONS]->(p:PERIOD), (i)-[aa:ALLOWANCES_IN_ALLOCATION]->(p:PERIOD), " +
                        "(i)-[off:OFFSETS]->(o:OFFSET)-[:OFFSET_PERIOD]->(p:PERIOD) " +
                        "WHERE c.name IN " + countryNames + " AND s.name IN " + sectorNames + " " +
					   "RETURN sum(ve.value) AS Verified_Emissions, sum(aa.value) AS Allowances_in_Allocation, sum(o.amount) AS Offsets, " +
                       "sum(aa.value) - sum(ve.value) AS Surplus_Free_Allowances, " +
                       "sum(aa.value) + sum(o.amount) - sum(ve.value) AS Surplus_With_Offsets, p.name ORDER BY p.name";

	console.log(statementSt);

	query.statements.push({"statement":statementSt});

	var xhr = new XMLHttpRequest();    
	xhr.onloadend = onLoadEnd;
	xhr.open("POST", serverURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(query));
}

