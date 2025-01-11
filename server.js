#! /usr/bin/env node

import { tools } from './src/tools.js';
import { prompts } from './src/prompts.js';
import { resources } from './src/resources.js';
import { MCP } from 'mcp-js-server';

const infos = {
    name: 'mcp-demo-server',
    version: '0.1.0'
};

const server = new MCP(infos, prompts, resources, tools);
