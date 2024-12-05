<?php

require_once('./config.php');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if ($input) {
    $question_one = $input['question_one'];
    $question_two = $input['question_two'];
    $question_thre = $input['question_thre'];
    $points = $input['points'];


    $insert_query = "INSERT INTO lead (question_one, question_two, question_thre, points) VALUES ('$question_one', '$question_two', '$question_thre', '$points')";
    $result_sql = mysqli_query($link, $insert_query);

    if ($result_sql) {
        $response_array['status'] = 'success';
        $response_array['query'] =  $insert_query;
    } else {
        $response_array['status'] = 'error';
        $response_array['message'] = 'Failed to insert data into the database';
    }

} else {
    $response_array['status'] = 'vazio';
}

header('Content-type: application/json');
echo json_encode($response_array);
?>
