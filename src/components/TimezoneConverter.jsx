import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
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
      .get("https://worldtimeapi.org/api/timezone")
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
  <option value="">Selecionar</option>
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

      <Box mt="4">

          <Text as='b'>{getConvertedTime()}</Text>
          <Text fontSize='sm'> ( {isLocalTime ? "Horário em seu local" :  `Horário em ${selectedTimezone}`} )</Text>

        </Box>
          <Button disabled mt="8" onClick={handleToggleClick}>Inverter</Button>
    </Box>
  );
}

export default TimezoneConverter;
