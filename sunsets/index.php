<?require("/global/header.php");?>
<title>A Pi Project</title>
<link rel="stylesheet"  href='/assets/css/sunsets.css' type='text/css'/>
</head>
<body>
<div class="appContainer">
<div id="pictures"><div class="slides_container"></div></div>
<div id="controls">
	<button id="prev">Prev</button>
	<button id="next">Next</button>
	<button id = "play">Auto Play</button>
	<button id ="clear">Stop</button>	
</div>
<fieldset>
		<p><label>Custom Date/Time Picker</label></p>
	<div>
	
		<select id = "date" name="date">
		</select>
		<select id = "time" name="time">
			<?for ($i=4; $i<24; $i++){?>
				<option value ="<? if($i<10) echo "0".$i; else echo $i; ?>00"><?=$i?>:00</option>
				<option value ="<? if($i<10) echo "0".$i; else echo $i; ?>30"><?=$i?>:30</option>
			<?}?>
		</select>

		<button id = "custom">Go</button>
	</div>
</fieldset>
</div>


<?require("/global/footer.php");?>

<script type = "text/javascript" src="/assets/js/sunsets.js"></script>
