-- Example ServerScript Usage:

local Remote : RemoteEvent = game.ReplicatedStorage.RemoteEvent
local HS = game:GetService("HttpService")
local Backend = "https://glitch app" -- Example : https://app-name.glitch.me/rankup (using my api)

local function ReqRank(UserId : number, rank : number)
	-- check if player blacklisted here etc
	local data = {
		Rankup = true,
		GroupRankNumber = rank,
		PlayerUserId = UserId,
	}
	
	local jsonData = HS:JSONEncode(data)
	
	local suc, res = pcall(function()
		return HS:PostAsync(Backend, jsonData, Enum.HttpContentType.ApplicationJson)
	end)
	
	if suc then
		local response = HS:JSONDecode(res)
		print("suc, res: ", res)
	else
		warn("failed to call backend:", res)
	end
end

Remote.OnServerEvent:Connect(function(player, UserId, rank)
	ReqRank(UserId, rank)
end)


-- Example localScript Usage:
local button : ImageButton = script.Parent
local buttonrank : number = 244 -- change this to ur rank, eg owner would be 255
local Remote : RemoteEvent = game.ReplicatedStorage.RemoteEvent


button.MouseButton1Click:Connect(function()
	Remote:FireServer(game.Players.LocalPlayer.UserId, buttonrank)
end)
