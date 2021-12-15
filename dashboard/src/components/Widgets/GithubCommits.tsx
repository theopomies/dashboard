import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import axios from "axios";
import Github from "github-api";
import { useEffect, useState } from "react";
import { endpoint, useUser } from "../../hooks/useServices";
import { formatBigNumber } from "../../utils/formatBigNumber";
import { WidgetCard } from "./WidgetCard";

export function GithubCommits() {
  const user = useUser("github");
  const [github, setGithub] = useState<Github>(null);
  const [commits, setCommits] = useState(0);
  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState(0);

  const updateRepos = () => {
    if (!github) return;
    github.getUser().listRepos((_error, repos) => {
      setRepos(repos);
    });
  };

  useEffect(() => {
    if (!user) {
      setGithub(null);
      setCommits(0);
      return;
    }
    setGithub(new Github({ token: user.accessToken }));
    axios
      .get(endpoint("github") + user.id)
      .then((res) => setRepo(res.data.commitsWidgetId || 0))
      .catch(console.log);
  }, [user]);

  useEffect(() => {
    updateRepos();
    const interval = setInterval(() => updateRepos(), 60000);
    return () => clearInterval(interval);
  }, [github]);

  useEffect(() => {
    if (repos.length <= repo) return;
    github
      .getRepo(repos[repo].owner.login, repos[repo].name)
      .listCommits((_error, commits) => setCommits(commits.length));
  }, [repo, repos]);

  useEffect(() => {
    axios
      .put(endpoint("github") + user.id, { commitsWidgetId: repo })
      .catch(console.log);
  }, [repo]);

  return (
    <WidgetCard rowSpan={1} name="commits">
      <HStack h="100%" spacing={10}>
        <Flex
          backgroundColor="brand.lightGray"
          h="4rem"
          w="4rem"
          justify="center"
          align="center"
          borderRadius="100%"
        >
          <CheckIcon fontSize="2rem" color="brand.darkGray" />
        </Flex>
        <VStack align="flex-start">
          <Heading>{formatBigNumber(commits)}</Heading>
          <Heading size="sm" color="brand.gray" fontWeight="regular">
            Commits to{" "}
            <Select value={repo} onChange={(v) => setRepo(+v.target.value)}>
              {repos.map((repo, idx) => (
                <option key={idx} value={idx}>
                  {repo.full_name}
                </option>
              ))}
            </Select>
          </Heading>
        </VStack>
      </HStack>
    </WidgetCard>
  );
}
