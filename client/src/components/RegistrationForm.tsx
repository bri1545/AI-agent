import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RegistrationFormProps {
  clubId: string;
  onSubmit: (data: InsertRegistration) => void;
  isLoading?: boolean;
}

export function RegistrationForm({ clubId, onSubmit, isLoading }: RegistrationFormProps) {
  const { t } = useTranslation();
  
  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      clubId,
      studentName: "",
      studentAge: 10,
      parentContact: "",
    },
  });
  
  return (
    <Card className="p-6" data-testid="registration-form">
      <h2 className="text-2xl font-semibold mb-6">{t("registrationForm")}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("studentName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("studentName")}
                    data-testid="input-student-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="studentAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("studentAge")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder={t("studentAge")}
                    onChange={(e) => field.onChange(parseInt(e.currentTarget.value))}
                    data-testid="input-student-age"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="parentContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("parentContact")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("parentContact")}
                    data-testid="input-parent-contact"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-testid="button-submit-registration"
          >
            {isLoading ? t("loading") : t("confirmRegistration")}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
