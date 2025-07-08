"use client";

import React, { useEffect } from "react";
import { Machine } from "../page";
import apiClient from "@/lib/apiClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";

export default function MachineEdit() {
  const { machineId } = useParams<{ machineId: string }>();
  const [machine, setMachine] = React.useState<Machine | null>(null);

  const fetchMachineData = async () => {
    const { data } = await apiClient.get(`/machine/${machineId}`);

    if (data != null) {
      setMachine(data);
    } else {
      console.error("Error fetching machine data");
    }
  };

  useEffect(() => {
    fetchMachineData();
  }, [machineId]);

  if (!machine) return <p>Loading machine data...</p>;

  return (
    <main className="flex-1 container mx-auto py-4">
      <header>
        <h1 className="text-2xl">Machine</h1>
        <h2 className="text-xl text-muted-foreground">{machineId}</h2>
      </header>
      <div className="p-4">
        <section
          title="Machine details form"
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <Label htmlFor="hostname" className="text-md my-2">
              Hostname
            </Label>
            <Input
              id="hostname"
              readOnly={true}
              value={machine.name ?? ""}
              disabled={true}
              className="cursor-not-allowed"
            />
          </div>
          <div>
            <Label htmlFor="ip" className="text-md my-2">
              IP Address
            </Label>
            <Input id="ip" readOnly={true} value={machine.ip ?? ""} />
          </div>
          <div className="flex flex-col justify-center">
            <Label htmlFor="active" className="text-md my-2">
              Active
            </Label>
            <Checkbox
              id="active"
              checked={machine.active ? true : false}
              onCheckedChange={() =>
                setMachine({
                  ...machine,
                  active: !machine.active,
                })
              }
            />
          </div>
        </section>
        <section
          title="Tasks associated with this machine"
          className=""
        ></section>
      </div>
    </main>
  );
}
