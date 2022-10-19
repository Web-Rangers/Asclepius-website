import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import _ from "lodash";

export function useDoctors() {
    // const queryClient = useQueryClient();

    const doctors = useQuery("doctors", async () => {
        const { data } = await axios.get("https://asclepius.pirveli.ge/asclepius/v1/api/clinics/doctors?page=0&size=10");
        return data;
    });

    // const add = useMutation(
    //     async (employee) => {
    //         const { data } = await axios.post("/api/Employee", employee);
    //         return data;
    //     },
    //     {
    //         onSuccess: (addedEmployee) => {
    //             queryClient.setQueryData("employees", (currentEmployees) => [
    //                 ...currentEmployees,
    //                 addedEmployee,
    //             ]);
    //         },
    //     }
    // );

    // const update = useMutation(
    //     async (employee) => {
    //         const { data } = await axios.put("/api/Employee", employee);
    //         return data;
    //     },
    //     {
    //         onSuccess: (updatedEmployee) => {
    //             queryClient.setQueryData("employees", (currentEmployees) =>
    //                 currentEmployees.map(
    //                     (employee) => (employee.id === updatedEmployee.id
    //                         ? updatedEmployee
    //                         : employee)
    //                 )
    //             );
    //         },
    //     }
    // );

    // const remove = useMutation(
    //     async (id) => {
    //         const { data } = await axios.delete(`/api/Employee/${id}`);
    //         return data;
    //     },
    //     {
    //         onSuccess: (id) => {
    //             queryClient.setQueryData("employees", (currentEmployees) =>
    //                 currentEmployees.filter((employee) => employee.id !== id)
    //             );
    //         },
    //     }
    // );

    return {
        doctors,
        // add,
        // update,
        // remove,
    };
}