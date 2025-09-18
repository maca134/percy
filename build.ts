/*
  This script is heavily inspired by `built.ts` used in @kaze-style/react.
  https://github.com/taishinaritomi/kaze-style/blob/main/scripts/build.ts
  MIT License
  Copyright (c) 2022 Taishi Naritomi
*/
import { $ } from "bun";
import type { BuildOptions, Plugin, PluginBuild } from "esbuild";
import { build } from "esbuild";
import fs from "fs";
import { sync } from "glob";
import path from "path";

const entryPoints = sync("./src/**/*.ts", {
	ignore: ["./src/**/*.spec.ts"],
});

/*
  This plugin is inspired by the following.
  https://github.com/evanw/esbuild/issues/622#issuecomment-769462611
*/
const addExtension = (extension = ".js", fileExtension = ".ts"): Plugin => ({
	name: "add-extension",
	setup(build: PluginBuild) {
		build.onResolve({ filter: /.*/ }, (args) => {
			if (args.importer) {
				const p = path.join(args.resolveDir, args.path);
				let tsPath = `${p}${fileExtension}`;

				let importPath = "";
				if (fs.existsSync(tsPath)) {
					importPath = args.path + extension;
				} else {
					tsPath = path.join(
						args.resolveDir,
						args.path,
						`index${fileExtension}`,
					);
					if (fs.existsSync(tsPath)) {
						importPath = `${args.path}/index${extension}`;
					}
				}
				return { path: importPath, external: true };
			}
		});
	},
});

const commonOptions: BuildOptions = {
	entryPoints,
	logLevel: "info",
	platform: "node",
};

const cjsBuild = () =>
	build({
		...commonOptions,
		outbase: "./src",
		outdir: "./dist/cjs",
		format: "cjs",
	});

const esmBuild = () =>
	build({
		...commonOptions,
		bundle: true,
		outbase: "./src",
		outdir: "./dist",
		format: "esm",
		plugins: [addExtension(".js")],
	});

await $`rm -rf ./dist`;

await $`tsc --emitDeclarationOnly --declaration --project tsconfig.build.json`;

Promise.all([esmBuild(), cjsBuild()]);

console.log("Build completed!");
