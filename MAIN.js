const fastify = require("fastify")({ logger: true });
const fetch = require("node-fetch");

const ROBLOX_COOKIE = "COOKIE"; // mama may i have cookie
const GROUP_ID = 1234567; // no explanation needed

fastify.register(require("@fastify/formbody"));

fastify.post("/rankup", async (request, reply) => {
  const { Rankup, GroupRankNumber, PlayerUserId } = request.body;

  if (!Rankup || !GroupRankNumber || !PlayerUserId) {
    reply.status(400);
    return { error: "missing pars" };
  }

  const url = `https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${PlayerUserId}/roles`;
  const body = JSON.stringify({ roleId: Number(GroupRankNumber) });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `.ROBLOSECURITY=${ROBLOX_COOKIE}`,
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      reply.status(response.status);
      return { error: data };
    }

    return { status: "success", data };
  } catch (error) {
    reply.status(500);
    return { error: error.toString() };
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(`port: ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
