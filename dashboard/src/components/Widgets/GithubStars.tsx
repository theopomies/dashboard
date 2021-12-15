import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import Github from "github-api";
import { Select } from "@chakra-ui/select";
import { useEffect, useState } from "react";
import { endpoint, useUser } from "../../hooks/useServices";
import { formatBigNumber } from "../../utils/formatBigNumber";
import { WidgetCard } from "./WidgetCard";
import axios from "axios";

export function GithubStars() {
  const user = useUser("github");
  const [github, setGithub] = useState<Github>(null);
  const [repos, setRepos] = useState<
    { fullName: string; stargazersCount: number }[]
  >([]);
  const [repo, setRepo] = useState(0);

  useEffect(() => {
    if (!user) {
      setGithub(null);
      setRepos([]);
      return;
    }
    setGithub(new Github({ token: user.accessToken }));
    axios
      .get(endpoint("github") + user.id)
      .then((res) => setRepo(res.data.starsWidgetId || 0))
      .catch(console.log);
  }, [user]);

  const updateRepos = () => {
    if (!github) return;
    github.getUser().listRepos((_error, repos) => {
      setRepos(
        repos.map(
          ({ full_name: fullName, stargazers_count: stargazersCount }) => ({
            fullName,
            stargazersCount,
          })
        )
      );
    });
  };

  useEffect(() => {
    updateRepos();
    const interval = setInterval(() => updateRepos(), 60000);
    return () => clearInterval(interval);
  }, [github]);

  useEffect(() => {
    axios
      .put(endpoint("github") + user.id, { starsWidgetId: repo })
      .catch(console.log);
  }, [repo]);

  return (
    <WidgetCard rowSpan={1} name="stars">
      <HStack h="100%" spacing={10}>
        <Flex
          backgroundColor="brand.lightGray"
          h="4rem"
          w="4rem"
          justify="center"
          align="center"
          borderRadius="100%"
        >
          <StarIcon fontSize="2rem" color="brand.darkGray" />
        </Flex>
        <VStack align="flex-start">
          <Heading>
            {formatBigNumber(
              repos.length > repo ? repos[repo].stargazersCount : 0
            )}
          </Heading>
          <Heading size="sm" color="brand.gray" fontWeight="regular">
            Stars on{" "}
            <Select value={repo} onChange={(v) => setRepo(+v.target.value)}>
              {repos.map((repo, idx) => (
                <option key={idx} value={idx}>
                  {repo.fullName}
                </option>
              ))}
            </Select>
          </Heading>
        </VStack>
      </HStack>
    </WidgetCard>
  );
}
