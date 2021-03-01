# Vaccine Counter
## [View the site here](https://amazing-villani-d72493.netlify.app/)
## Why
I have been doing a react course and I wanted to take some of what I have learnt and put it to use. Covid-19 vaccinations have been going on at an impressive rate around the world and I thought that this would be a fun way to show the pace that vaccications are happening in the U.K.

## Data
I use data from [United Kingdom's Covid-19 Dashboard](https://coronavirus.data.gov.uk/). The way I am calculating the data is probably not the most accurate but this was for a bit of fun. I take the amount of cases at the end of the previous day. Then use the seven day average and the difference in time between the stats being released and the current time to work out how many people are being vaccinated per second. This is not perfect because vaccines are not happening at the same rate at all hours of the day.

## Future

Here are a list of things I am thinking of adding.

- Full Dosing I am currently only including information about the first dose.
- Other countries apart from the U.K. Maybe the U.S.A. or the whole of the E.U.
- Looking into getting the data from API's so I do not have to update the data manually.
