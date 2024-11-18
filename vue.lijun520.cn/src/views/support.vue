<template>
	<div class="box">
		<p class="animate" style="color:yellow;font-size:30px;">
			<!-- <img src="./flag.jpg"/>   -->
			<span id='shower'>
			    <a href="https://www.lijun520.cn/" target="_blank">主站:www.lijun520.cn</a><br>
			    <a href="https://nav.lijun520.cn/" target="_blank">导航:nav.lijun520.cn</a><br>
				<a href="https://pan.lijun520.cn/" target="_blank">主站网盘:pan.lijun520.cn</a><br>
				感谢阿里巴巴图标库提供图标支持<br>
				<br>
				特别鸣谢/参考资料:<br>
				<img src="/static/github.png"><br>				
				<a href="https://github.com/itorr/sakana" target="_blank">https://github.com/itorr/sakana </a><br>
				<a href="https://github.com/DIYgod/APlayer" target="_blank">https://github.com/DIYgod/APlayer</a><br>
				<a href="https://github.com/flymysql/CET4-Mouse-click-effects"
					target="_blank">https://github.com/flymysql/CET4-Mouse-click-effects</a><br>
			</span>
		</p>
	</div>
	<button class="btn-primary" type="button" id="btn-homeback" @click="$router.push('/home')">返回主页</button>
</template>
<script lang="ts" setup>

</script>
<style scoped>
* {
			margin: 0;
			padding: 0;
		}

		.box {

			width: 1000px;
			height: 700px;
			margin: 10px auto;
			border: 0px solid #ff6700;
			background-color: black;
			overflow: hidden;
		}

		.box img {
			width: 150px;
			height: 100px;
			padding-right: 50px;
			padding-bottom: 20px;

		}

		.box .animate {
			padding-top: 400px;
			padding-left: 200px;
			font-size: 12px;
			color: #000;
			display: inline-block;
			white-space: nowrap;
			animation: 30s wordsLoop linear infinite normal;
		}
		@keyframes wordsLoop {
			0% {
				transform: translateY(250px);
				-webkit-transform: translateY(250px);
			}

			100% {
				transform: translateY(-100%);
				-webkit-transform: translateY(-100%);
			}
		}

		.box .animate:hover {

			animation-play-state: paused;

		}

		#btn-homeback{
			position: absolute;
			right: 0px;
			top: 400px;
			margin: 0px auto;
			width: 100px;
			height: 50px;
			border-radius: 5px;
			cursor: pointer;
			outline: none;
		}

		#btn-homeback:hover {
			background: #fb0000;
		}

</style>