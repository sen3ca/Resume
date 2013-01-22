<?php 
include("db_conn/mysql_settings.php");

function executeAndConvertToJson($query) {
	global $mysqli;
	$mysqli->real_query($query);
	$result = $mysqli->use_result();
	$rows = array();
	while ($row = $result->fetch_assoc()) {
		array_push($rows, $row);
	}
	return json_encode($rows);
}

function getResumes() {
	global $mysqli;
	$query = "select * from resume";
	return executeAndConvertToJson($query);
}

//this is vulnerable to SQL Injection
function getResume($resumeId) {
	global $mysqli;
	$query = "select * from resume where id = $resumeId";
	return executeAndConvertToJson($query);
}

// this is vulnerable to SQL Injection 
function getMissionStatement($resumeId) {
	global $mysqli;
	$query = "select * from mission_statement where resume_id = $resumeId";
	return executeAndConvertToJson($query);
}

// this is vulnerable to SQL Injection
function getSkills($resumeId) {
	global $mysqli;
	$query = "select * from skill where resume_id = $resumeId";
	return executeAndConvertToJson($query);
}

// this is vulnerable to SQL Injection
function getJobs($resumeId) {
	global $mysqli;
	$query = "select * from job_history where resume_id = $resumeId";
	return executeAndConvertToJson($query);
}

// this is vulnerable to SQL Injection
function getCustom($resumeId) {
	global $mysqli;
	$query = "select * from custom where resume_id = $resumeId";
	return executeAndConvertToJson($query);
}


function insertResume($name, $email, $password){
	global $mysqli;
	$query = "INSERT INTO resume(name, email, password) VALUES (?, ?, ?)";
	$stmt = $mysqli->prepare($query);
	$stmt->bind_param("sss", $name, $email, $password);
	$stmt->execute();
	return mysqli_insert_id($mysqli);
}

function insertMission($resumeId, $statement){
	global $mysqli;
	$query = "INSERT INTO mission_statement(resume_id, statement) VALUES (?, ?)";
	$stmt = $mysqli->prepare($query);
	$stmt->bind_param("is", $resumeId, $statement);
	$stmt->execute();
}

function insertSkill($resumeId, $skill, $proficiency){
	global $mysqli;
	$query = "INSERT INTO skill(resume_id, skill, proficiency) VALUES (?, ?, ?)";
	$stmt = $mysqli->prepare($query);
	$stmt->bind_param("isi", $resumeId, $skill, $proficiency);
	$stmt->execute();
	
}

function insertJob($resumeId, $companyName, $beginDate, $endDate, $description, $satisfaction){
	global $mysqli;
	$query = "INSERT INTO job_history(resume_id, company_name, begin_date, end_date, description, satisfaction) VALUES (?, ?, ?, ?, ?, ?)";
	$stmt = $mysqli->prepare($query);
	$stmt->bind_param("issssi", $resumeId, $companyName, $beginDate, $endDate, $description, $satisfaction);
	$stmt->execute();
}

function insertCustom($resumeId, $title, $text){
	global $mysqli;
	$query = "INSERT INTO custom(resume_id, title, text) VALUES (?, ?, ?)";
	$stmt = $mysqli->prepare($query);
	$stmt->bind_param("iss", $resumeId, $title, $text);
	$stmt->execute();
}

