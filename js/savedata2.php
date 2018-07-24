<?php
file_put_contents('logs.txt', file_get_contents('php://input'), FILE_APPEND);

?>