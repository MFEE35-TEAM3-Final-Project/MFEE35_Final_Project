<?php
$image = $_FILES['image'];
$filename = $image['name'];
$filetype = $image['type'];
$filedata = file_get_contents($image['tmp_name']);
