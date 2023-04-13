import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import moment from "moment-timezone";
import axios from "axios";

function TimezoneConverter() {
  const [localTime, setLocalTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [isLocalTime, setIsLocalTime] = useState(true);

  useEffect(() => {
    axios
      .get("http://worldtimeapi.org/api/timezone")
      .then((response) => {
        setTimezones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const handleLocalTimeChange = (event) => {
    setLocalTime(event.target.value);
  };

  const handleToggleClick = () => {
    setIsLocalTime(!isLocalTime);
  };


  const getConvertedTime = () => {
    const format = "MMMM Do YYYY, h:mm:ss a";
    if (isLocalTime) {
      if (selectedTimezone && localTime) {
        return moment.tz(localTime, selectedTimezone)
          .tz(moment.tz.guess())
          .format(format);
      } else {
        return "";
      }
    } else {
      if (localTime) {
        return moment.tz(localTime, moment.tz.guess())
          .tz(selectedTimezone || moment.tz.guess())
          .format(format);
      } else {
        return "";
      }
    }
  };





  return (
    <Box p="4">
      <FormControl>
        <FormLabel>Escolha o país</FormLabel>
        <Select value={selectedTimezone} onChange={handleTimezoneChange}>
          {timezones.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Horário {isLocalTime ? `em ${selectedTimezone}` : "em seu local"}</FormLabel>
        <Input type="datetime-local" onChange={handleLocalTimeChange}/>
      </FormControl>
    { isLocalTime && selectedTimezone ? ( 
      <Box mt="4">
        <Button onClick={handleToggleClick}> {isLocalTime ? "Horário em seu local" :  `Horário em ${selectedTimezone}`} </Button>
          <Box>{getConvertedTime()}</Box>
        </Box>
          ): ""} 
    </Box>
  );
}

export default TimezoneConverter;
