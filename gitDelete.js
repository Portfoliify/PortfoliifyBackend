import axios from "axios";
import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";
dotenv.config();
const username = "your-username";
const token = "YOUR_ACCESS_TOKEN";

async function getAllRepositories() {
  try {
   
    const octokit = new Octokit({
      auth: process.env.GITHUB_DELETE_TOKEN, // Replace with your GitHub token
    });

    const repos = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    // console.log(typeof(repos.data))
    console.log('Rate Limit Remaining:', repos.headers['x-ratelimit-remaining']);
console.log('Rate Limit Reset Timestamp:', repos.headers['x-ratelimit-reset']);

    for(const repo of repos.data){
      console.log(repo.name)
      const ress = await octokit.repos.delete({
        owner: 'Portfoliify', // Replace with the actual owner (username or organization)
        repo: repo.name,   // Replace with the actual repository name
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      console.log(ress.status)
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

getAllRepositories();
