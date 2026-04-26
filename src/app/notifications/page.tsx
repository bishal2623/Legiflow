"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  return (
    <main>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardHeader>
            <CardTitle>🔔 Notifications</CardTitle>
            <CardDescription>Recent alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Card className="p-4 border-red-300 bg-red-100 text-red-800 dark:border-red-500/50 dark:bg-red-500/20 dark:text-red-200">
                ⚠️ Lease Agreement flagged as High Risk!
              </Card>
              <Card className="p-4 border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-500/50 dark:bg-yellow-500/20 dark:text-yellow-200">
                ⚠️ NDA contains restrictive non-compete clause.
              </Card>
              <Card className="p-4 border-green-300 bg-green-100 text-green-800 dark:border-green-500/50 dark:bg-green-500/20 dark:text-green-200">
                ✅ Service Agreement safe to proceed.
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
