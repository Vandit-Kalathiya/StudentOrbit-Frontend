const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div id="move" className="border-2 border-indigo-500 flex overflow-hidden p-8 mb-5">
        <div className="marque flex items-center gap-12">
          {Array(5)
            .fill("404 NOT FOUND")
            .map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <h1 className="text-4xl">{text}</h1>
                <img
                  src="data:image/png;base64,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"
                  alt="not found"
                  className="h-10"
                />
              </div>
            ))}
        </div>
      </div>
      <div id="move" className="border-2 border-indigo-500 flex overflow-hidden p-8 mb-5">
        <div className="marque flex items-center gap-12">
          {Array(5)
            .fill("404 NOT FOUND")
            .map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <h1 className="text-4xl">{text}</h1>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8hISEAAAAeHh4REREUFBQXFxcZGRkLCwsbGxsFBQXr6+vy8vLk5OT5+fkSEhLV1dXKyspOTk6QkJC8vLyDg4OZmZnf39+vr69ZWVknJyd5eXlTU1OpqanOzs61tbXExMRAQEBmZmZra2uUlJQuLi6hoaE4ODhFRUWIiIh7e3syMjJeXl5xcXFnZ2dS63fIAAAO3ElEQVR4nOVdh5KqShDVHkCSiiIoRnRXV3f1/f/nPdQNTAAmgeg9Vbdu1apAMz2dpkOnUz+8IJ0dwuiyS8bH7XZ7HCe7SxQeNmngNXD3WuGvV1GCIINrG6blOA66IvvfMg3bvX7QTaLV2n/0g8rAT+PzMKPM6KFuGVDPyCgdnuPRM5HpT6I9gF1BG06nDfAVTZ6CynX4ka0JP3E5MrM1/wjXjyagHOkiWztHgrofODa4i/TRZBRhtJBcPHopF6NHE0OjH5pgKlP3g+xaYf/RJGGYjMFWX708kA3jyaPJ+oEf29DTSt4dPTDiNghX71P38v0hW8jPR5s9/QsYNZF3hwGXR27I/ptG6VIEE94eRaO/4KXPsb6t0Dxsw+LUnCYsHrIf3zn4M7M6r8Rsd1E8m6yDqed5fvZvGqzTWRztttcPqyzXKwx4b5y+ielWLVxGnJ2cNkHZ+/eDTZhkNqlRtZyu2azu6I+h9MWjjLptOOGVg14aHjMqyy8J4wa3Y1iq/3oufIWjgeA1B6PTF7il14WwFmpoBPMSBnUAlitZHeatlgAl/OrOA62UFCAqZtCrqTVTE3v+rMwARHDSREUxpvvCBbSgG+uwQLy4C1bhMu6nGm5RgkMhExmw0+fyjM6FqsiBg7bb0BgkUMA9Lpz0GpDeCdwCZoVEVIpxI7CGbPrAPui/6eDgFuz4oVUTp84Kbujaq3pu2FnZ7E2PYFbH7RZsDrVr3Rcx2GxO/dR+q8GY+TotiGrbFPf7Rmy5CmPNN/LmLDcCQVK/JdVPmLvDnGsVbVOmkrCdVOdNCpE6LFZ1QKO8GbHeogORvjtUgGlHIdCmgCcsGdOQjfiNYM5aRtDkUc0YBKIGF/AO5jLq0RorBoGm3fzxwshmCDvQoIpZBNZoN5WAaTOqryKDRRHEOh5YAu8MTlUlkSFkHH0iTBgjhtZSEzcjmsDh/pFRaG9PG/8qb3xKEwiJvseVwpLxTNKq36PZHhY6n1YKtAeAQJKtBnOK6R8QmKXxTpHozOWuNKb0jw7towG0AhtKeRoLyl2Cje5nlcSGIlHGX6QVoS4rUANoJSauFmkx2iICmSQKCtSBRYrR1rDoHRSjIkfMkkxIxdoSIfMHStwMhTT1gfx5K9QEDkppiITEqE3YAkVPg1L9AltxT6h6MQZoDAkR+Xf2vL+MXNlfNgxyJVzOk6mAWH1ps692UIYz8MWO5uTPWphG9w3Su+PjtpDg0Yd59DyICRJdDpnfJ35jtlPK/CAh3AOoDsKP8WQBZDwi6MSPAZHB0av0MkiDD1qeldxZkw9cZT6b+Ctxmw78ioPQbcgs//o7/nVZ57lREFrRLZWMPrnkTZ5NyILU31CW77LA7SC7/Tx6RYSf2hglRjShKZDT3FMqgXBmSzTGG65cIG3uIZWQ4itjvhV9kVhCq926Po8EP+svXMSLyfe99oFYG/PC/pqHf+1JxMwdhLAp8IY+cUEK7TbXcAzw1TGY4VNCF7p1JgLpR4ybKkydGGMLjezGH1INeFKqzTJs8K+0LnpYBTy6iAz6G7hT8XRL2OngyZoMFwP3C59sF15xwHYi7ScSGuWpBOkdhDiltHmIyRmj/oRx/Thh2s4mSxfw8tbWxg/LgFssaIh/ioflrN1jnlERZ8w6JYKgC7Pkw2cBvkwm7ibiC9x90COqAuFbLf8R7mAxDYJKDEar8PQ+U417BLP3U7gSLpu6ATfLMPeWYFIJOTM639p72ADwKe91TT9vpZfXcsyzxE7BZc0wz6bYCYcjnrrRP+byzYdwkdOmgwv8HT1bcBR/U+N82A3l2BSPqoqnNcyIhDrDkMnDCmzcfXNkHgQj5C+ajav70mgcCyEjD0s8VL5m5JiJFhziHmBO6X/kl6C3FLwsK8cWCWfTTZlZzqIezjJvXTsfP3/GKXcFr8pIYLxeXVTjdJlFcaIvaoWZ37/ciDtOopJ0y67Xc8U47MSucHK2Yg+DOxC/LlSUT55BX2LXTJlL2BXczuRxwt9VUrHH+crz+vAnmLbP/9UQ3N3LouJkIRfzUFSZKioVMAcDfR964+9P0CYtfPm5fc6Bj8L6ZkHJjrPU94+JP4pp60ImFXq24vckyqYD1nJh1pzo1o7Z9YG3y/ObqOQBWQ6iRjIm+L5/fM7vJNFtGBU3xxB4+yWcYAiG3rGNaJ1vf8Pce9Es0kVxexOBfE066fcXQ8GUOkz13YOKvpI2bN0aerSowcxu4TjpofZ9KBrXxCLbN/sYM3R6omeGjKqa36vzS+VByVVE/cQkL1ZuJijGZ6KCpuTZhNzMcbE+FPU1MVFz43GMZvFs7l1RCwshv4Dln9wgHvbDpNaNJ7HwjXh6SdEWQlD92xyKGqYoPhBCHSLMJuz90rlzP1cSkxBUZvkdEnmDhG6gpKvwBbMrsl6/JWgbdbYsbkcSb7xDaj9sUUVtthtY4tRxRR/NdxnCRio0jdltGZdjylYunL+hVrHnisfJ+lSTKCRXxYLJvszsmOXVoagB8Y010S8HtjKtlPwtkW4gmfmJqT93gxslctHuTCsu/po7OSDd7eQAv6yKbFhInmFi7k5mEoUYxdKF0f0T+u4WuF3Jn64ODtvvqyD5Dq04V4adKC/slerTvHQz2yj35vbX2VVSlfNLzLswo84F25dtz3nmAeZKWJfOjpCtzw9M//V2nQSjsOZmaI0AC1E7CW7VP+X5PQnMSss8nCN6aQrRuLN9cQq3BIVt6C6tCr+Uwldcw9ffh68vS19fH764TePs/gG7FPct0kc/ngakhG+B+Yf19AVtGFhSTeYfavHxWwXSx99oiNO0C2ScRkOsrWUgY23q8dK2gYyXKse8WwfqxFf13KJtoM4tOl21s6fWgT57Ujw/bB3o80O1M+D2IaTOgNXO8bngT9PZe/SWHD/mc6c7/zomb5/vq3Ray6anz/HVcjGqMN2clsZtiOXQ6t1HWCLk9KzhbXiQvTxtdDtsdC6GWj5NGYJ4WTELCF3H7cA41ujSeAxy8JyoVM+NBpv/rmMsC2nL4zrAcrfRxLKMnCi1vDY2NgkUjxlhwgJYbnSUBGKCpnfPa8NzE4/K9wg+QWqWXg9goa6Oj4zcRPwcXrW2cnIE9pwPHgxhq9h/ksgvTW9/VMoRJjDrlk0z4oADSKnGesQ0QrHsb5Xy0Q0qH+XFBQSOgmHFzPNWy9X/w/pDA313Gr+k1Qc7V1+t3uIb/psif+bhwE5OeRDa8GdTq9XM3DFTkC8smHJBsYKaGcW6p07JICgFwFJiGQvqnlRr1zIBVjHMEvWGNjnCclg12dEUF+uFtWuK9YeskQV/xJmZiW0tP+NNep1h6WfwpkG6iT+XmYp3zbKfCne+Law/xHtKiNaQnos5NLPFnMuqMMdmEKwuCEoYAM5ij4LXkLq5TxaYmBCSpoNtUS67CfDfrDqzydu8FRNpf4iYWCV1wPK13P6cbWE7AG8p91VGl6LJjtZcQCqU1HJL1+P7DtPG7sHHTMy+Hcy2bG+k5/CT2C2ux5ftqTCYswi0IJGxSYIzk8benPddlfZUIPpi8G7wMUPNO3CWDUxMzyxeNXkl366sLwbR1ZNT1rDKlWCr4uMFW9awHD5LnOhtQnb5lOpPQ5cAW8onkDNarnKeplT0p5HpMUTXy0CiHm3xaf0q8zR0x0CJPlFkU2WkqUEYNSyTq79hVZ8osteXy7gGCaK21dI2HnTqEJ0eeTijstdXB2+qzLUcWN9QY6uvexZuKKEex0+q+7XJ9NzLiydb73lAkr80T4STo+ce2TeRw3Qb/HGGIeFVlmL5KxmRy8EcREE/WzZJ9L4MfgKjoP94/Ke+pMeTisbV+1Kqf2n/mLmyBtQy7zECMDLHmasRD1//UrketEG8iKTHxZfDW0WLmMtC4uxB+w/0EX79XtBP28+biGmVba+X78n+D/TVJ2cjoGecjVARgsS7fD4Dn5LzLYYV36dmlLS9DabwjBJqzozd7n67A9zi5pgz8w/MCqLnPbVvbN4fqHlPXKkkTzyzi1P2v/7cNarD3/PMzuPWbdT8Q90OvB4siYi7wEq8/gzL159D+g/Mkn3GecCWoPH18jOd/4G53J3OJ32VtjCqntnqmZdBHeS1RNzQzd24j4lxDObUAWgrlAalJuTHNFJmXytUP6XoVQxnRqtueLS7uGQ8k8K5JaMVm7F/pKfh7ensDzXvjhbLXeeBJe0jRjaKqhKj1WLG9o+qh45ZqSjK5eesvpuQPCI8xUzT1aHAWCSaRvOcurYZCYx6NDSDUTNObTpUHDGnQ2jqkMAQN92uu2/yTCPYsxrv67OUR6z35zS4jBErow/pDAJOmfmttpXqu0UJ0h4rDdnR20zHm7PKKRAk9c+b7SfMRHlzrtvyGDPz1S2I6lUcg4idOgxy3kQpaH/xzqq16v8DsPPk5fzBKlApg99w7brcxpXNHl2C6uqjM3XYtU0I3IN+Xh0c3IJXOtSWBEnftKi8Cblw0rvxvRO4BeU09dqMh8ISPENqFlwBRjsomirhSHcp5sSUaVzcYAGKdSykF3eLC8Hdff0t5U7FlZTIhvFMLdPbn43BLqz2asgcZtuIv0wEy5WsGeCtlkXVQfcFnDdlC4el9fY9F75OwkMoB6PTF1Bt2bHrCo/SU0B/XF7UjAyAbTjh3ZXeJDwCGOWXhHH9FmIeE7OEVW+4NvWwk9MmKNuYfrAJEzujrqpK2h02f6YQFwr03IvvGbc27bsonk3W1xpSz8/+TYN1Oouj3a0Be1nvkx8YjwlF+4uq8t/f5bRuw1OJQmDD4ixvN2HxqAZd/TdeGhVgwluzG5Cg8cLBqyow4PJI+q7wPks0tCIyC+KzDbk8fmxI9aOpQg+MuDVpg5MyU0sKVwOwPWfOV/TDoUapY4IpP8GjPowWAEP1lURDgEVrkwXTjEhbpYmLY4O7SB9NRjnW4YfkUl4X7yN8im7U/iTaZ2tJJR2VEHdt2baPJs/UW9QfxefMJnWrrM7Mcs3sOeMcp89E3S/89SpKblOSXNswrZ5zb5zoOI5lfluqKIlW6zZodSV4Qbo5hNFll4zH2+12PE52lyg8zNKgCdL+Bx/qzJOU4qreAAAAAElFTkSuQmCC"
                  alt="not found"
                  className="h-10"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
